# Ollama setup verification for Prism Chat and Studio

Tracks issue #37. This is a test protocol, not a verified setup guide. No model, hardware configuration, or application connection is certified by this document.

## Test environment

Record these details before testing. Use non-sensitive sample content only.

```text
Test date:
Tester:
Windows version:
Prism release/tag and installer source:
Prism Chat version:
Prism Studio version:
Ollama version:
Exact downloaded model name and tag:
CPU:
GPU and VRAM (if applicable):
Installed RAM:
```

## Verify each application independently

Complete this procedure once for Prism Chat and once for Prism Studio. Do not assume settings are shared.

1. Start Ollama and confirm the selected model is available using the installed Ollama version's documented controls.
2. Open the released Prism application. Record the exact navigation path to its AI settings.
3. Record the provider selector label and select Ollama. Record every required connection field, its label, and the value used; redact credentials and private addresses before sharing.
4. Select the downloaded model. Record whether the model is selected from a list or entered manually, and record the exact name and tag.
5. Record the exact Save/Apply control, or explicitly note that settings save automatically.
6. Submit a short, non-sensitive prompt containing a new test marker. Record the application's status indicator and whether independent Ollama-side request activity can be observed. A plausible answer or echoed marker alone is not proof of live inference.
7. Make Ollama unavailable using its documented controls, then start a new request. Record the exact error, connection status, and any demo/fallback label. Do not count a demo response as successful inference.
8. Restore Ollama and repeat with a different marker. Record whether live operation resumes. If provider-side activity or response origin cannot be established, mark the result inconclusive rather than passed.
9. Restart Prism and check whether the provider/model settings persist. Record the result separately from connection success.

## Results

| Evidence | Prism Chat | Prism Studio |
| --- | --- | --- |
| Release tested | Not tested | Not tested |
| Settings navigation and labels | Not recorded | Not recorded |
| Provider/model values and save steps | Not recorded | Not recorded |
| Live request evidence | Not collected | Not collected |
| Ollama unavailable behavior | Not tested | Not tested |
| Demo/fallback distinguishable | Not tested | Not tested |
| Recovery after restoring Ollama | Not tested | Not tested |
| Settings persist after restart | Not tested | Not tested |
| Overall result | Unverified | Unverified |

## Publish verified instructions

After testing, update [the local-model guide](local-models.md) with separate Chat and Studio instructions, exact UI labels, the tested release and model tag, and the observed connection-check procedure. Describe hardware as the tested configuration, not a minimum requirement unless minimum requirements were separately established.

If Chat cannot distinguish live output from demo fallback, record that as an unresolved application limitation instead of claiming that the connection is verified from the response alone.

Leave issue #37 open until a new user can reproduce the documented setup in both released applications and distinguish live output from demo content. Remove prompts, credentials, personal data, and private paths from screenshots or logs before publishing evidence.
