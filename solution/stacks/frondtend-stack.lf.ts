import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
  CfnOutput,
  aws_s3 as s3,
  aws_s3_deployment as s3_deployment,
  DockerImage
} from 'aws-cdk-lib';

export interface TodoFrontendProps extends StackProps {}

export class TodoFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props: TodoFrontendProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'TodoAppFrontendBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html'
    });

    const deployment = new s3_deployment.BucketDeployment(this, 'TodoAppFrontendDeployment', {
      destinationBucket: bucket,
      sources: [
        s3_deployment.Source.asset('./frontend', {
          bundling: {
            image: DockerImage.fromRegistry('node:16-alpine'),
            environment: {
              REACT_APP_API_URL: 'https://ew73s2r9li.execute-api.eu-central-1.amazonaws.com/prod/',
              npm_config_cache: '/tmp/npm_cache',
              npm_config_update_notifier: 'false'
            },
            command: [
              'sh',
              '-c',
              [
                `cd $(mktemp -d)`,
                `cp -r /asset-input/* .`,
                `npm ci`,
                `npm run build`,
                `cp -r build/* /asset-output`
              ].join(' && ')
            ]
          }
        })
      ]
    });

    new CfnOutput(this, 'WebsiteEndpoint', { value: bucket.bucketWebsiteUrl });
  }
}
