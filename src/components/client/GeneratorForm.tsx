"use client";

import emailSignatureGenerator from "@/lib/emailSignatureGenerator";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Input from "./Input";
import { SignatureConfig } from "@/signature.config.yaml";
import mustache from "mustache";

const COPIED_MESSAGE_TIMEOUT = 3000;

type Data = { [key: string]: string | undefined };

const GeneratorForm: FC<{ config: SignatureConfig }> = ({ config }) => {
  const [html, setHtml] = useState<string>();
  const [copied, setCopied] = useState(false);

  const defaultData = useMemo(
    () => Object.fromEntries(config.fields.map(({ name }) => [name, ""])),
    [config]
  );

  const [data, setData] = useState<Data>(defaultData);
  const setField = useCallback(
    (fieldName: keyof Data, value: string) =>
      setData((data) => ({ ...data, [fieldName]: value })),
    [setData]
  );

  useEffect(() => {
    setHtml(emailSignatureGenerator<Data>(data));
  }, [data, setHtml]);

  const copySignature = useCallback(() => {
    if (!html) {
      throw new Error("HTML not defined");
    }

    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([html], { type: "text/plain" }),
      }),
    ]);

    setCopied(true);
  }, [html, setCopied]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = setTimeout(() => setCopied(false), COPIED_MESSAGE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [copied, setCopied]);

  return (
    <div className="mx-auto space-y-4 py-4 max-w-md">
      <form action={copySignature}>
        <div className="font-semibold text-3xl">Email signature generator</div>

        <div className="space-y-2 py-2">
          {config.fields.map(({ name, type = "text", placeholder }) => (
            <div key={name}>
              <Input
                type={type}
                name={name}
                placeholder={
                  placeholder
                    ? mustache.render(placeholder, { domain: config.domain })
                    : name
                        .replace(/[A-Z]/, " $&")
                        .replace(/^[a-z]/, (value) => value.toUpperCase())
                }
                disabled={copied}
                value={data[name] ?? ""}
                onChange={(e) => setField(name, e.currentTarget.value)}
              />
            </div>
          ))}

          <div>
            <button
              disabled={copied}
              type="submit"
              className={`border rounded-md px-3 py-2 shadow ${
                copied ? "bg-gray-600" : "bg-blue-600"
              } text-white font-semibold`}
            >
              {copied ? "Copied." : "Copy signature"}
            </button>
          </div>
        </div>
      </form>

      <div>
        <div>Preview</div>
        {<iframe className="w-full h-48 border shadow" srcDoc={html} />}
      </div>
    </div>
  );
};

export default GeneratorForm;
