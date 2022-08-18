#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoBackendStack } from './stacks/backend-stack';

const user = undefined  // Set denne variabelen til ditt kortnavn

if (!user) {
  throw Error("DU MÅ SETTE user TIL NOE FOR Å UNNGÅ KOLLISJON I AWS KONTOEN!")
}

const app = new cdk.App();
const backend = new TodoBackendStack(app, `${user}TodoAppBackend`, {
  env: {
    account: '908493323448',
    region: 'eu-central-1'
  }
});
