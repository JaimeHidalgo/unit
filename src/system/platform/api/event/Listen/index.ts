import { Semifunctional } from '../../../../../Class/Semifunctional'
import { Unit } from '../../../../../Class/Unit'
import { Pod } from '../../../../../pod'
import { System } from '../../../../../system'
import { Unlisten } from '../../../../../types/Unlisten'

export interface I<T> {
  method: string
  data: any
  event: string
  unit: Unit<any, any, any>
}

export interface O<T> {
  data: any
}

export default class Listen<T> extends Semifunctional<I<T>, O<T>> {
  private _listener: ((data: any) => void) | undefined

  private _unlisten: Unlisten | undefined = undefined

  constructor(system: System, pod: Pod) {
    super(
      {
        fi: ['unit', 'event'],
        fo: [],
        i: ['remove'],
        o: ['data'],
      },
      {
        input: {
          unit: {
            ref: true,
          },
        },
      },
      system,
      pod
    )

    this.addListener('destroy', () => {
      if (this._listener) {
        this._remove()
      }
    })
  }

  private _remove = () => {
    this._unlisten()

    this._listener = undefined
    this._unlisten = undefined
  }

  f({ unit, event }: I<T>) {
    const listener = (data: any) => {
      this._output.data.push(data)
    }
    this._listener = listener

    this._unlisten = unit.addListener(event, this._listener)
  }

  d() {
    this._remove()
  }

  onIterDataInputData(name: string, data: any) {
    // if (name === 'remove') {
    if (this._listener) {
      this._remove()
      this._done()
    }
    // }
  }
}
