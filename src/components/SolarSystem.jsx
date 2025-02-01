import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './SolarSystem.css';

function SolarSystem() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    camera.position.z = 1000;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const sunGeometry = new THREE.SphereGeometry(50, 64, 64);
    const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffcc00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const textureLoader = new THREE.TextureLoader();

    const planets = [
      {
        name: 'Mercury', size: 10, distance: 100, duration: 5,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter07-edit1.jpg/1200px-Mercury_in_color_-_Prockter07-edit1.webp',
        normalMap: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mercury_normal_map.jpg/1200px-Mercury_normal_map.jpg',
        specularMap: null,
        roughnessMap: null,
        atmosphere: false,
        clouds: false,
        rings: false,
      },
      {
        name: 'Venus', size: 20, distance: 150, duration: 8,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/1200px-Venus-real_color.webp',
        normalMap: null,
        specularMap: null,
        roughnessMap: null,
        atmosphere: true,
        clouds: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Venus_cloud_tops_from_Pioneer_Venus_Orbiter.jpg/1200px-Venus_cloud_tops_from_Pioneer_Venus_Orbiter.jpg',
        rings: false,
      },
      {
        name: 'Earth', size: 25, distance: 200, duration: 10,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1200px-The_Blue_Marble_%28remastered%29.webp',
        normalMap: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Earth_bump_map.jpg/1200px-Earth_bump_map.jpg',
        specularMap: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Earth_specular_map.tif/1200px-Earth_specular_map.tif.webp',
        roughnessMap: null,
        atmosphere: true,
        clouds: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Earthclouds.jpg/1200px-Earthclouds.jpg',
        rings: false,
      },
      {
        name: 'Mars', size: 15, distance: 250, duration: 12,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.webp',
        normalMap: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Mars_normal_map.jpg/1200px-Mars_normal_map.jpg',
        specularMap: null,
        roughnessMap: null,
        atmosphere: false,
        clouds: false,
        rings: false,
      },
      {
        name: 'Jupiter', size: 50, distance: 350, duration: 20,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_from_Voyager_1.jpg/1200px-Jupiter_from_Voyager_1.webp',
        normalMap: null,
        specularMap: null,
        roughnessMap: null,
        atmosphere: false,
        clouds: false,
        rings: false,
      },
      {
        name: 'Saturn', size: 40, distance: 450, duration: 25,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1200px-Saturn_during_Equinox.webp',
        normalMap: null,
        specularMap: null,
        roughnessMap: null,
        atmosphere: false,
        clouds: false,
        rings: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_rings_from_Cassini.jpg/1200px-Saturn_rings_from_Cassini.jpg',
      },
      {
        name: 'Uranus', size: 30, distance: 550, duration: 30,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1200px-Uranus2.webp',
        normalMap: null,
        specularMap: null,
        roughnessMap: null,
        atmosphere: true,
        clouds: false,
        rings: false,
      },
      {
        name: 'Neptune', size: 30, distance: 650, duration: 35,
        texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1200px-Neptune_Full.webp',
        normalMap: null,
        specularMap: null,
        roughnessMap: null,
        atmosphere: true,
        clouds: false,
        rings: false,
      },
    ];

    const planetGroups = planets.map((planet) => {
      const planetGroup = new THREE.Object3D();
      const geometry = new THREE.SphereGeometry(planet.size, 64, 64);

      const texture = textureLoader.load(planet.texture);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);

      const normalMap = planet.normalMap ? textureLoader.load(planet.normalMap) : null;
      if (normalMap) {
        normalMap.wrapS = THREE.RepeatWrapping;
        normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(1, 1);
      }

      const specularMap = planet.specularMap ? textureLoader.load(planet.specularMap) : null;
      if (specularMap) {
        specularMap.wrapS = THREE.RepeatWrapping;
        specularMap.wrapT = THREE.RepeatWrapping;
        specularMap.repeat.set(1, 1);
      }

      const roughnessMap = planet.roughnessMap ? textureLoader.load(planet.roughnessMap) : null;
      if (roughnessMap) {
        roughnessMap.wrapS = THREE.RepeatWrapping;
        roughnessMap.wrapT = THREE.RepeatWrapping;
        roughnessMap.repeat.set(1, 1);
      }

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: normalMap,
        specularMap: specularMap,
        roughnessMap: roughnessMap,
        roughness: 0.8,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = planet.distance;
      planetGroup.add(mesh);

      if (planet.clouds) {
        const cloudTexture = textureLoader.load(planet.clouds);
        const cloudGeometry = new THREE.SphereGeometry(planet.size + 0.1, 64, 64);
        const cloudMaterial = new THREE.MeshStandardMaterial({
          map: cloudTexture,
          transparent: true,
          opacity: 0.6,
        });
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        planetGroup.add(clouds);
      }

      if (planet.rings) {
        const ringTexture = textureLoader.load(planet.rings);
        const ringGeometry = new THREE.RingGeometry(planet.size + 10, planet.size + 20, 128);
        const ringMaterial = new THREE.MeshStandardMaterial({
          map: ringTexture,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2;
        planetGroup.add(rings);
      }

      if (planet.atmosphere) {
        const atmosphereGeometry = new THREE.SphereGeometry(planet.size + 0.5, 64, 64);
        const atmosphereMaterial = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(0x0077ff) },
            opacity: { value: 0.3 },
          },
          vertexShader: `
            varying vec3 vertexNormal;
            void main() {
              vertexNormal = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            uniform float opacity;
            varying vec3 vertexNormal;
            void main() {
              float intensity = pow(0.8 - dot(vertexNormal, vec3(0,0,1)), 2.0);
              gl_FragColor = vec4(color, opacity * intensity);
            }
          `,
          transparent: true,
          depthWrite: false,
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        planetGroup.add(atmosphere);
      }

      scene.add(planetGroup);

      // Add orbit lines
      const orbitGeometry = new THREE.RingGeometry(planet.distance, planet.distance + 0.5, 128);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      return { ...planet, mesh, group: planetGroup };
    });

    const animate = () => {
      requestAnimationFrame(animate);

      planetGroups.forEach((planet) => {
        planet.group.rotation.y += 0.01 * (10 / planet.duration);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="solar-system-container" ref={sceneRef} />;
}

export default SolarSystem;
