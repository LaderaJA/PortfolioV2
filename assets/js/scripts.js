document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Sticky Header
  const header = document.querySelector("header")
  const scrollWatcher = () => {
    if (window.scrollY > 50) {
      header.style.padding = "10px 0"
      header.style.backgroundColor = "rgba(8, 7, 7, 0.95)"
      header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(235, 121, 247, 0.2)"
    } else {
      header.style.padding = "20px 0"
      header.style.backgroundColor = "rgba(8, 7, 7, 0.8)"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
    }
  }

  window.addEventListener("scroll", scrollWatcher)

  // Create floating particles
  createParticles()

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".skill-card, .project-card, .contact-info")

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - 100) {
        element.classList.add("animate")
      }
    })
  }

  // Run on load and scroll
  revealOnScroll()
  window.addEventListener("scroll", revealOnScroll)

  // Active navigation highlighting
  const sections = document.querySelectorAll("section")

  const highlightNav = () => {
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add("active")
      } else {
        document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNav)

  // Add CSS for active nav links
  const style = document.createElement("style")
  style.textContent = `
    .nav-links a.active {
      color: var(--primary-color);
    }
    .nav-links a.active::after {
      width: 100%;
    }
  `
  document.head.appendChild(style)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add typing effect to the about section heading
  const aboutHeading = document.querySelector(".about-text h2")
  if (aboutHeading) {
    const text = aboutHeading.textContent
    aboutHeading.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        aboutHeading.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing effect when about section is in view
    const startTypingWhenVisible = () => {
      const aboutSection = document.querySelector(".about")
      const position = aboutSection.getBoundingClientRect()

      if (position.top < window.innerHeight && position.bottom >= 0 && !aboutHeading.textContent) {
        typeWriter()
        window.removeEventListener("scroll", startTypingWhenVisible)
      }
    }

    window.addEventListener("scroll", startTypingWhenVisible)
    startTypingWhenVisible() // Check on load as well
  }

  // Create floating particles for background
  function createParticles() {
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      // Create particles container
      const particlesContainer = document.createElement("div")
      particlesContainer.className = "particles"
      section.appendChild(particlesContainer)

      // Create random particles
      const numParticles = Math.floor(Math.random() * 10) + 5 // 5-15 particles

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"

        // Random size
        const size = Math.random() * 10 + 5 // 5-15px
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`

        // Random opacity
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString()

        // Random animation duration
        const duration = Math.random() * 20 + 10 // 10-30s
        particle.style.animationDuration = `${duration}s`

        // Random delay
        const delay = Math.random() * 5
        particle.style.animationDelay = `${delay}s`

        // Add to container
        particlesContainer.appendChild(particle)
      }
    })
  }

  // Parallax effect for sections
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset

    // Parallax for about section
    const aboutSection = document.querySelector(".about")
    if (aboutSection) {
      const aboutImage = aboutSection.querySelector(".about-image")
      const aboutText = aboutSection.querySelector(".about-text")

      if (aboutImage && aboutText) {
        aboutImage.style.transform = `translateY(${scrollPosition * 0.05}px)`
        aboutText.style.transform = `translateY(${scrollPosition * 0.03}px)`
      }
    }

    // Parallax for skills section
    const skillsSection = document.querySelector(".skills")
    if (skillsSection) {
      const skillCards = skillsSection.querySelectorAll(".skill-card")

      skillCards.forEach((card, index) => {
        const speed = 0.02 + index * 0.005
        card.style.transform = `translateY(${scrollPosition * speed}px)`
      })
    }

    // Parallax for projects section
    const projectsSection = document.querySelector(".projects")
    if (projectsSection) {
      const projectCards = projectsSection.querySelectorAll(".project-card")

      projectCards.forEach((card, index) => {
        const speed = 0.03 + index * 0.005
        card.style.transform = `translateY(${scrollPosition * speed}px)`
      })
    }
  })

  // Add mouse move effect to profile image
  const profileImg = document.querySelector(".profile-img")
  if (profileImg) {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5
      const mouseY = e.clientY / window.innerHeight - 0.5

      profileImg.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg) scale(1.05)`
    })

    // Reset transform when mouse leaves
    document.addEventListener("mouseleave", () => {
      profileImg.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1)"
    })
  }

  // Add glow effect to elements on mouse proximity
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Elements that should glow
    const glowElements = document.querySelectorAll(".btn, .social-link, .skill-card, .project-card")

    glowElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const elementX = rect.left + rect.width / 2
      const elementY = rect.top + rect.height / 2

      // Calculate distance between mouse and element center
      const distance = Math.sqrt(Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2))

      // Max distance for glow effect (in pixels)
      const maxDistance = 300

      if (distance < maxDistance) {
        // Calculate intensity based on distance
        const intensity = 1 - distance / maxDistance
        element.style.boxShadow = `0 0 ${20 * intensity}px rgba(235, 121, 247, ${0.5 * intensity})`
      } else {
        element.style.boxShadow = ""
      }
    })
  })
})
