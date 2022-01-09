export { }
interface Action<T> {
	payload?: T
	type: string
}

class EffectModule {
	count = 1
	message = 'hello!'
	delay(input: Promise<number>) {
		return input.then((i) => ({
			payload: `hello ${i}!`,
			type: 'delay'
		}))
	}
	setMessage(action: Action<Date>) {
		return {
			payload: action.payload!.getMilliseconds(),
			type: 'set-message'
		}
	}
}


// 1. keyof T ==== count|message|delay|setMessage
// 2. extends Function ==== {delay:delay,setMessage:setMessage}
// 3. keyof T ==== delay | setMessage
type methodsPick<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type EffectModuleType = {
	count: number
	message: string
	delay(input: Promise<number>): Promise<Action<string>>
	setMessage(input: Action<Date>): Action<number>
}

type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>
type asyncMethodConnect<T, U> = (input: T) => Action<U>
type syncMethod<T, U> = (action: Action<T>) => Action<U>
type syncMethodConnect<T, U> = (action: T) => Action<U>

type EffectModuleMethods = methodsPick<EffectModuleType>
type EffectModuleMethodConnect<T> = T extends asyncMethod<infer U, infer V> ?
	asyncMethodConnect<U, V> : T extends syncMethod<infer U, infer V> ? syncMethodConnect<U, V> : never

type Connect = (moudule: EffectModule) => {
	[M in EffectModuleMethods]: EffectModuleMethodConnect<EffectModule[M]>
}
type Connected = {
	delay(input: number): Action<string>
	setMessage(action: Date): Action<number>
}
const module = new EffectModule()

const connect: Connect = m => ({
	delay: (input: number) => ({
		type: 'delay',
		payload: 'hello 2'
	}),
	setMessage: (input: Date) => ({
		type: 'set-message',
		payload: input.getMilliseconds()
	})
})

export const connected: Connected = connect(module)