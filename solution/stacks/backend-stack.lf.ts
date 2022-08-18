import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  aws_apigateway as apigateway
} from 'aws-cdk-lib';

export interface TodoBackendProps extends StackProps {}

export class TodoBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: TodoBackendProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'TodoAppTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    const lambdaFunction = new lambda.Function(this, 'TodoAppBackendFunction', {
      code: lambda.Code.fromAsset('./backend'),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'server.handler',
      environment: {
        TASKS_TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(lambdaFunction)

    const api = new apigateway.LambdaRestApi(this, 'TodoAppApi', {
      handler: lambdaFunction,
      cloudWatchRole: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });

  }
}
