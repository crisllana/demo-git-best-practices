# play-playboard-app-academy-iam

[![ci](https://github.com/empathyco/play-playboard-app-academy-iam/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/empathyco/play-playboard-app-academy-iam/actions/workflows/ci.yml)

Before running this project locally make sure the right versions of [Node.js](https://nodejs.org/)
and [npm](https://www.npmjs.com/) (specified
[here](https://github.com/search?q=repo%3Aempathyco%2Fplay-playboard-app-academy-iam+%22engines%22+path%3Apackage.json&type=code))
are installed; tools like [Node Version Manager](https://github.com/nvm-sh/nvm) help to manage it.

Also, local npm registries must be configured following
[this guide](https://searchbroker.atlassian.net/wiki/spaces/EAF/pages/172753015/Setting+up+EmpathyBroker+s+private+npm+repository+locally)
.

## Development

The main branch of this repository is protected so every change must be implemented in a separate
branch and squash it into the main one through a pull request.

## Deployment

The main branch of this repository is automatically deployed in an Ephemeral environment
([link](https://playboard.test.empathy.co/previews/academy-iam/main/index.html)) on every change.

Also, every pull request pointing to the main branch will be automatically deployed in a custom
Ephemeral environment, which URL will be published as a comment on the same pull request
([example](https://github.com/empathyco/play-playboard-app-academy-iam/pull/5#issuecomment-1651708581))
.

For more details about the deployment process, check out the
[CI workflow](https://github.com/empathyco/play-playboard-app-academy-iam/actions/workflows/ci.yml)
.
