import { Construct } from "constructs";
import { S3Backend, TerraformOutput, TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { createS3DataStoreBucket } from "../provider/s3-data-store-bucket";

export interface AthenaStackConfig {
  backend: {
    bucket: string;
    key: string;
    region: string;
  };
  provider: {
    region: string;
  };
  domain: string;
  project: string;
  environment: string;
}

export class AthenaStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: AthenaStackConfig) {
    super(scope, id);

    const prefix = `${config.domain}-${config.project}-${id}`;

    new S3Backend(this, config.backend);

    new AwsProvider(this, "provider", config.provider);

    const bucket = createS3DataStoreBucket(this, "data_store", {
      prefix,
      environment: config.environment,
    });

    new TerraformOutput(this, "output-bucket-arn", {
      value: bucket.arn,
    });
  }
}
