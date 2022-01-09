import { Pod } from '../../../../pod'
import { Primitive } from '../../../../Primitive'
import { System } from '../../../../system'

export interface I<T> {
  a: T
}

export interface O<T> {
  a: T
}

export default class Constant<T> extends Primitive<I<T>, O<T>> {
  private _current: T | undefined = undefined

  constructor(system: System, pod: Pod) {
    super(
      {
        i: ['a'],
        o: ['a'],
      },
      {},
      system,
      pod
    )

    this.addListener('reset', () => {
      this._current = undefined
    })
  }

  onDataInputData(name: string, data: T) {
    this._current = data
    this._output.a.push(data)
  }

  onDataInputDrop(name: string) {
    if (!this._backwarding) {
      this._forward_all_empty()
      this._current = undefined
    }
  }

  onDataOutputDrop(name: string) {
    if (!this._forwarding_empty) {
      this._output.a.push(this._current)
    }
  }

  onDataInputInvalid(name: string) {
    this._invalidate()
  }
}
