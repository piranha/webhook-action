# Send webhooks from Github Actions

This is a minimal depencies webhook action. The only dependency is Github's
`@actions` library to support inputs/ouputs. It's done in JavaScript as Github
documentation says this is faster than Docker.


## Usage

```yml
jobs:
  example:
  steps:
  - name: notify slack
    uses: piranha/webhook-action@1.0.0
    with:
      url: ${{secrets.SLACK_WEBHOOK}}
      data: '{"text": "hello everyone"}'
```
