import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { Pod } from '../../../../pod'
import { System } from '../../../../system'

export interface I<T> {
  'a[]': T[]
  a: T
}

export interface O<T> {
  i: number
}

export default class IndexOf<T> extends Functional<I<T>, O<T>> {
  constructor(system: System, pod: Pod) {
    super(
      {
        i: ['a[]', 'a'],
        o: ['i'],
      },
      {},
      system,
      pod
    )
  }

  f({ 'a[]': _a, a }: I<T>, done: Done<O<T>>): void {
    done({
      i: _a.indexOf(a),
    })
  }
}
