import { AsyncGraph } from '../interface/async/AsyncGraph'
import { G } from '../interface/G'
import { Pod } from '../pod'
import { fromSpec } from '../spec/fromSpec'
import { System } from '../system'
import { GraphSpec } from '../types'
import { Dict } from '../types/Dict'
import { Component } from './component'
import { componentFromSpec } from './componentFromSpec'
import { Client } from './render/Client'
import { getSpec } from './spec'

export function graphComponentFromSpec(
  system: System,
  pod: Pod,
  spec: GraphSpec,
  input: Dict<any> = {}
): Client {
  const { specs } = system

  const Class = fromSpec(spec, specs)

  const graph = new Class(system, pod)

  for (const pinId in input) {
    const data = input[pinId]
    graph.setPinData('input', pinId, data)
  }

  const $graph = AsyncGraph(graph)

  const component = componentFromSpec(system, pod, spec)

  component.connect($graph)

  graph.play()

  const client = { graph, component }

  return client
}

export function graphComponentFromId(
  system: System,
  pod: Pod,
  specId: string,
  input: Dict<any> = {}
): { graph: G; component: Component } {
  const { specs } = system

  const spec: GraphSpec = getSpec(specs, specId) as GraphSpec

  const controller = graphComponentFromSpec(system, pod, spec, input)

  return controller
}
