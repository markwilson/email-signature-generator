"use client";

import emailSignatureGenerator from "@/lib/emailSignatureGenerator";
import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import { SignatureData, SignatureDataSchema } from "@/lib/types";

// TODO: move this to configuration
const DOMAIN = "example.com";

const COPIED_MESSAGE_TIMEOUT = 3000;

const GeneratorForm = () => {
  const [html, setHtml] = useState<string>();
  const [copied, setCopied] = useState(false);

  const [data, setData] = useState<SignatureData>(
    SignatureDataSchema.parse({})
  );
  const setField = useCallback(
    (fieldName: keyof SignatureData, value: string) =>
      setData((data) => ({ ...data, [fieldName]: value })),
    [setData]
  );

  useEffect(() => {
    const newHtml = emailSignatureGenerator(data);
    setHtml(newHtml);
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
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              disabled={copied}
              value={data.name}
              onChange={(e) => setField("name", e.currentTarget.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              name="pronouns"
              placeholder="Pronouns"
              disabled={copied}
              value={data.pronouns}
              onChange={(e) => setField("pronouns", e.currentTarget.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              name="jobTitle"
              placeholder="Job title"
              disabled={copied}
              value={data.jobTitle}
              onChange={(e) => setField("jobTitle", e.currentTarget.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              name="emailAddress"
              placeholder={`Email (e.g. first.last@${DOMAIN})`}
              disabled={copied}
              value={data.emailAddress}
              onChange={(e) => setField("emailAddress", e.currentTarget.value)}
            />
          </div>

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
