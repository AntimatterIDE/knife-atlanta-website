module.exports = {
  title: "Knife - Atlanta Steakhouse",
  titleTemplate: "%s",
  description: "Knife is a distinguished steakhouse in Atlanta offering an exquisite dining experience.",
  openGraph: {
    type: 'website',
    url: 'https://knifeatlanta.com',
    title: 'Knife - Atlanta Steakhouse',
    description: "Experience the finest dining with Knife's exquisite steakhouse offerings in Atlanta.",
    images: [
      {
        url: '/path/to/og-image.jpg',
        width: 1200,
        height: 627,
        alt: 'Knife - Atlanta Steakhouse Food Presentation',
      }
    ]
  },
  robotsProps: {
    userAgent: '*',
    allow: '/',
    sitemap: 'https://knifeatlanta.com/sitemap.xml'
  }
}