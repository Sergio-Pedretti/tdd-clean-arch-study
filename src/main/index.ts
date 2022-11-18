import './config/module-alias'
import { app } from '@/main/config/app'

import 'reflect-metadata'

app.listen(8080, () => console.log('Server running...'))
