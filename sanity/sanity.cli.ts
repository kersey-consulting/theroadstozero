// sanity/sanity.cli.ts
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: 'dm3m4n0d',
        dataset: 'production',
    },
    deployment: {
        appId: 'xp06vpc62petmfky327s1tf0'
    }
})
