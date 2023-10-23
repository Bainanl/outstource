import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'

export function useGetters(mapper) {
    // 拿到store独享
    const store = useStore()

    // 获取到对应的对象的functions: {name: function, age: function}
    const stateFns = mapGetters(mapper)

    // 对数据进行转换
    const State = {}
    Object.keys(stateFns).forEach(fnKey => {
        const fn = stateFns[fnKey].bind({ $store: store })
        State[fnKey] = computed(fn)
    })

    return State
}

