import { Construct } from 'constructs';
import {
  Stack,
  StackProps
} from 'aws-cdk-lib';

export interface TodoBackendProps extends StackProps {}

export class TodoBackendStack extends Stack {

  constructor(scope: Construct, id: string, props?: TodoBackendProps) {
    super(scope, id, props);
  }
}
