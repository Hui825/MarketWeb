const MapComponent = () => {
    const htmlUrl = 'https://localhost:3000/춘천중앙시장.html';
  
    return (
      <iframe
        title="Chuncheon Market"
        src={htmlUrl}
        style={{ width: '100%', height: '500px', border: 'none' }}
        allowFullScreen
      />
    );
  };
  
  export default MapComponent;