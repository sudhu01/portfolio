'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-4">
            My Portfolio
          </Link>
          <nav className="hidden md:block">
            {" "}
            <ul className="flex space-x-4">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-muted-foreground hover:text-foreground">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hover:cursor-pointer"><Link href="/Sudharsan Balajee Resume.pdf" download="Sudharsan Balajee Resume.pdf" target="_blank">Resume</Link></Button>
          <ThemeToggle />
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                      Home
                    </Link>
                    <Link
                      href="/projects"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Projects
                    </Link>
                    <Link
                      href="/skills"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Skills
                    </Link>
                    <Link
                      href="/contact"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="hover:cursor-pointer"><Link href="/Sudharsan Balajee Resume.pdf" download="Sudharsan Balajee Resume.pdf" target="_blank">Resume</Link></Button>
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

