import template from "./templates/email-signature.template.mustache";
import { SignatureData } from "./types";

const emailSignatureGenerator = (data: SignatureData) => template(data);

export default emailSignatureGenerator;
