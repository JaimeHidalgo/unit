import { Element } from '../Class/Element'
import { Graph } from '../Class/Graph'
import { Stateful } from '../Class/Stateful'
import { Unit } from '../Class/Unit'
import { DEFAULT_EVENTS } from '../constant/DEFAULT_EVENTS'
import { Unlisten } from '../types/Unlisten'
import callAll from '../util/call/callAll'
import { Moment } from './Moment'
import { watchGraphInternal } from './watchGraphInternal'
import {
  watchElementCallEvent,
  watchStatefulSetEvent,
  watchUnitEvent,
} from './watchUnitEvent'
import { watchUnitIO } from './watchUnitIO'

export function watchUnit<T extends Unit>(
  unit: T,
  callback: (moment: Moment) => void,
  events: string[] = DEFAULT_EVENTS
): Unlisten {
  const all: Unlisten[] = []

  all.push(watchUnitIO(unit, events, callback))

  if (unit instanceof Stateful) {
    if (events.includes('set')) {
      all.push(watchStatefulSetEvent('set', unit, callback))
    }
  }

  if (unit instanceof Element) {
    if (events.includes('call')) {
      all.push(watchElementCallEvent('call', unit, callback))
    }
  }

  if (events.includes('listen')) {
    all.push(watchUnitEvent('listen', unit, callback))
  }

  if (events.includes('unlisten')) {
    all.push(watchUnitEvent('unlisten', unit, callback))
  }

  if (unit instanceof Graph) {
    all.push(watchGraphInternal(unit, events, callback))
  }

  let unlisten = callAll(all)

  return unlisten
}
