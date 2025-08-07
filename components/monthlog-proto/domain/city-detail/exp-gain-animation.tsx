"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Zap } from "lucide-react"

interface ExpGainAnimationProps {
  exp: number
  show: boolean
  onComplete?: () => void
  durationMs?: number
}

/**
 * Floating EXP gain badge that fades out automatically.
 */
export function ExpGainAnimation({ exp, show, onComplete, durationMs = 2000 }: ExpGainAnimationProps) {
  // Call onComplete after animation ends
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => {
        onComplete?.()
      }, durationMs)
      return () => clearTimeout(t)
    }
  }, [show, durationMs, onComplete])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none flex justify-center pt-20">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.5,
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 font-bold text-base"
          >
            <Zap className="w-5 h-5" />
            <span>+ {exp} EXP 경험치가 쌓였어요</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
