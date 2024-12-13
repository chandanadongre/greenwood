const services = [
    {
      title: 'Heating & Air Repair',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra, dui sed convallis cursus.',
      image: './img/air.png',
      imageAlt: 'Heating and Air Repair Service',
      link: 'repair.html',
      links: 'repair.html'
    },
    {
      title: 'Heating & Air Replacement',
      description: 'Proin bibendum pulvinar nisl, nec efficitur est convallis sed. Suspendisse ut est et orci viverra molestie.',
      image: './img/air.png',
      imageAlt: 'Heating and Air Replacement Service',
      reverse: true,
      links: 'replacement.html',
      link: 'replacement.html'
    },
    {
      title: 'Heating & Air Management',
      description: 'Cras rutrum tincidunt tellus in tempus. Nulla diam nulla, accumsan non ultricies ut.',
      image: './img/air.png',
      imageAlt: 'Heating and Air Management Service',
      links: 'managaement.html',
      link: 'managaement.html'
    },
    {
      title: 'Ventilation',
      description: 'Proin bibendum pulvinar nisl, nec efficitur est convallis sed. Suspendisse ut est et orci viverra molestie.',
      image: './img/air.png',
      imageAlt: 'Ventilation Service',
      reverse: true,
      links: 'ventilation.html',
      link: 'ventilation.html'
    },
    {
      title: 'Heat Pump',
      description: 'Maecenas luctus, ligula non vestibulum lacinia, risus urna convallis metus.',
      image: './img/air.png',
      imageAlt: 'Heat Pump Service',
      links: 'heat-pump.html',
      link: 'heat-pump.html'
    }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('services-container');
    const template = document.getElementById('service-template');
  
    services.forEach((service, index) => {
      const serviceElement = template.content.cloneNode(true);
      const gridContainer = serviceElement.querySelector('.grid');
      const imageContainer = serviceElement.querySelector('.service-image-container');
      const contentContainer = serviceElement.querySelector('.service-content');
      const image = serviceElement.querySelector('img');
      const title = serviceElement.querySelector('h3');
      const description = serviceElement.querySelector('p');
      const imageLink = serviceElement.querySelector('.image-link');
      const titleLink = serviceElement.querySelector('.title-link');
  
      image.src = service.image;
      image.alt = service.imageAlt;
      imageLink.href = service.link;
      title.textContent = service.title;
      titleLink.href=service.link;
      description.textContent = service.description;
      imageContainer.classList.add('cursor-pointer', 'transition-transform', 'duration-300', 'hover:scale-105');
      contentContainer.classList.add('cursor-pointer', 'transition-transform', 'duration-300', 'hover:scale-105');

      if (service.reverse) {
        imageContainer.classList.add('md:order-2');
        contentContainer.classList.add('md:order-1', 'md:pr-8');
      } else {
        contentContainer.classList.add('md:pl-8');
      }
      contentContainer.classList.add('text-center', 'md:text-left');
      imageContainer.addEventListener('click', () => {
        window.location.href = service.link;
      });
      container.appendChild(serviceElement);
    });
  });
