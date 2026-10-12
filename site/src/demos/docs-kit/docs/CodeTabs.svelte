<script lang="ts">
  import { CodeTab, CodeTabs } from '@codeatlasdev/ui';

  const curl = `curl -X POST https://api.example.com/messages/text \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "x-instance: my-session" \\
  -d '{"to":"5511999990000","text":"Hello"}'`;
  const node = `await fetch("https://api.example.com/messages/text", {
  method: "POST",
  headers: { "x-api-key": process.env.API_KEY, "x-instance": "my-session" },
  body: JSON.stringify({ to: "5511999990000", text: "Hello" }),
});`;
  const curlList = `curl https://api.example.com/sessions -H "x-api-key: YOUR_API_KEY"`;
  const nodeList = `await fetch("https://api.example.com/sessions", { headers: { "x-api-key": KEY } });`;
</script>

<div class="ca-prose wrap">
  <CodeTabs sync="demo-lang">
    <CodeTab label="cURL">
      <div class="ca-code"><pre><code>{curl}</code></pre></div>
    </CodeTab>
    <CodeTab label="Node.js">
      <div class="ca-code"><pre><code>{node}</code></pre></div>
    </CodeTab>
  </CodeTabs>
  <CodeTabs sync="demo-lang">
    <CodeTab label="cURL">
      <div class="ca-code"><pre><code>{curlList}</code></pre></div>
    </CodeTab>
    <CodeTab label="Node.js">
      <div class="ca-code"><pre><code>{nodeList}</code></pre></div>
    </CodeTab>
  </CodeTabs>
</div>

<style>
  .wrap { width: 100%; max-width: 100%; }
</style>
