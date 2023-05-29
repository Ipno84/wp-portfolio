import { CracoConfig } from '@craco/types'

import { babel } from './babel'
import { devServer } from './devServer'
import { eslint } from './eslint'
import { jest } from './jest'
import { plugins } from './plugins'
import { style } from './style'
import { typescript } from './typescript'
import { webpack } from './webpack'

const config: CracoConfig = {
	reactScriptsVersion: 'react-scripts' /* (default value) */,
	style,
	eslint,
	babel,
	typescript,
	webpack,
	jest,
	devServer,
	plugins,
}

export default config
