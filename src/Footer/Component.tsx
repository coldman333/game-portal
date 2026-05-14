import React from 'react'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-900 bg-black">
      <div className="px-4 py-8">
        <p className="text-center text-sm text-[#71717b]">
          © {new Date().getFullYear()} Games portal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
