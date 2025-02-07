import { Graph } from '../Class/Graph'
import { GraphExposedPinSpec } from '../types'
import { Moment } from './Moment'

export interface GraphExposedPinSetMomentData {
  type: 'input' | 'output'
  pinId: string
  pinSpec: GraphExposedPinSpec
}

export interface GraphExposedPinSetMoment
  extends Moment<GraphExposedPinSetMomentData> {}

export function watchGraphExposedPinSetEvent(
  event: 'expose_pin_set' | 'cover_pin_set',
  graph: Graph,
  callback: (moment) => void
): () => void {
  const listener = (
    type: 'input' | 'output',
    pinId: string,
    pinSpec: GraphExposedPinSpec
  ) => {
    callback({
      type: 'graph',
      event,
      data: {
        type,
        pinId,
        pinSpec,
      },
    })
  }
  graph.prependListener(event, listener)
  return () => {
    graph.removeListener(event, listener)
  }
}
