import { Construct } from 'constructs';
import { join } from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi, EndpointType } from 'aws-cdk-lib/aws-apigateway';

export class CdkCiTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_16_X,      // execution environment
      code: Code.fromAsset(join(__dirname, '..', 'src/')),  // code loaded from the "lambda" directory
      handler: 'lambda/hello.handler'                // file is "hello", function is "handler"
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new LambdaRestApi(this, 'Endpoint', {
      handler: hello,
      endpointTypes: [ EndpointType.EDGE ],
    });

  }
}
