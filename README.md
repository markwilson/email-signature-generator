# Email signature generator

Use an HTML template to generate email signatures based on user information.

## How to use?

1. Clone this repo
2. Set the user fields you want to use in `/src/signature.config.yaml`
3. Paste your email signature HTML into `/src/lib/template/email-signature.template.mustache`
4. Use [mustache](https://mustache.github.io/) syntax in the template file with the field names as the properties

## Deploying to GitHub Pages

By default, this repository deploys to `https://<your username/organisation>/email-signature-generator`.

_NOTE: Make sure you have GitHub Pages enabled for your repository, and configured to use GitHub Actions for deploying._

If you want to deploy elsewhere, the `next.config.mjs:basePath` may need to be updated.

## Example

`/src/signature.config.yaml`

```yaml
domain: mydomain.com
fields:
  - name: firstName
  - name: emailAddress
    type: email
  - name: phoneNumber
    type: tel
    placeholder: Phone (e.g. +44 ...)
```

`/src/lib/template/email-signature.template.mustache`

```html
{{firstName}}<br />
{{#phoneNumber}}<a href="tel:{{phoneNumber}}">{{phoneNumber}}</a
>{{/phoneNumber}}<br />
<a href="mailto:{{emailAddress}}>">{{emailAddress}}</a>
```
