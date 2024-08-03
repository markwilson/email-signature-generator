import GeneratorForm from "@/components/client/GeneratorForm";
import config from "@/signature.config.yaml";

export default function Page() {
  return <GeneratorForm config={config} />;
}
