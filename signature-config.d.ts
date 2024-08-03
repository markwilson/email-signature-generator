declare module "@/signature.config.yaml" {
  type SignatureConfigField = {
    name: string;
    placeholder?: string;
    type?: import("react").HTMLInputTypeAttribute;
  };

  export type SignatureConfig = {
    domain: string;
    fields: SignatureConfigField[];
  };

  const config: SignatureConfig;
  export default config;
}
