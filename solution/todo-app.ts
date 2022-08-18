#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoBackendStack } from './stacks/backend-stack.lf';
import { TodoFrontendStack } from './stacks/frondtend-stack.lf';

const user = "chrgjo"

const app = new cdk.App();
const backend = new TodoBackendStack(app, `${user}TodoAppBackend`, {
  env: {
    account: '908493323448',
    region: 'eu-central-1'
  }
});
const frontend = new TodoFrontendStack(app, `${user}TodoAppFrontend`, {
  env: {
    account: '908493323448',
    region: 'eu-central-1'
  }
});
