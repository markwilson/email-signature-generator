import template from "./templates/email-signature.template.mustache";

const emailSignatureGenerator = <T>(data: T) => template(data);

export default emailSignatureGenerator;
