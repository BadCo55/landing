let loading
export function loadGoogleMaps() {
  if (window.google?.maps?.places) return Promise.resolve(true)
  const key = import.meta.env.VITE_GOOGLE_API_KEY
  if (!key) return Promise.resolve(false)
  if (loading) return loading
  loading = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=' +
      encodeURIComponent(key) +
      '&libraries=places&loading=async&callback=dhiMapsReady'
    script.async = true
    const timer = setTimeout(() => resolve(false), 12000)
    window.dhiMapsReady = () => {
      clearTimeout(timer)
      resolve(true)
      delete window.dhiMapsReady
    }
    script.onerror = () => {
      clearTimeout(timer)
      resolve(false)
    }
    document.head.appendChild(script)
  })
  return loading
}
