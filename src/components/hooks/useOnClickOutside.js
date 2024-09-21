'use client'

import { useEffect, useRef } from 'react'

export default function useOnClickOutside(handler) {
    const ref = useRef(null)

    useEffect(() => {
        let startedInside = false
        let startedWhenMounted = false

        const listener = (e) => {
            if (startedInside || !startedWhenMounted) return
            if (!ref.current || ref.current.contains(e.target)) return

            handler(e)
        }

        const validateEventStart = (e) => {
            startedWhenMounted = ref.current
            startedInside = ref.current && ref.current.contains(e.target)
        }

        document.addEventListener('mousedown', validateEventStart)
        document.addEventListener('touchstart', validateEventStart)
        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('mousedown', validateEventStart)
            document.removeEventListener('touchstart', validateEventStart)
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
    return ref
}
