import * as assert from 'assert'
import { watchUnitAndLog } from '../../../../debug'
import Void from '../../../../system/f/control/Void'
import { pod, system } from '../../../util/system'

const voip = new Void(system, pod)

voip.play()

false && watchUnitAndLog(voip)

voip.push('a', 1)
assert.equal(voip.peakInput('a'), undefined)

voip.push('a', 2)
assert.equal(voip.peakInput('a'), undefined)
