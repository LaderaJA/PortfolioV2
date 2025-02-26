// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Highlight active section in navigation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

// Add active class to nav links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.classList.add("hover")
  })

  link.addEventListener("mouseleave", () => {
    link.classList.remove("hover")
  })
})

// Simple scroll animation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (sectionTop < windowHeight * 0.75) {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }
  })
})

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Trigger scroll event to animate elements in view on page load
  window.dispatchEvent(new Event("scroll"))
})

