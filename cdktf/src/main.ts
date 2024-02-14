import { App } from "cdktf";
import { AthenaStack } from "./stacks/athena-stack";

const project = "cdktf-aws-athena";
const environment = "dev";
const app = new App();
new AthenaStack(app, "data-store", {
  backend: {
    bucket: process.env.TERRAFORM_S3_BACKEND_BUCKET,
    key: `${project}/data-store/${environment}.tfstate`,
    region: process.env.AWS_DEFAULT_REGION,
  },
  provider: {
    region: process.env.AWS_DEFAULT_REGION,
  },
  domain: process.env.TERRAFORM_DOMAIN,
  project,
  environment,
});
app.synth();
