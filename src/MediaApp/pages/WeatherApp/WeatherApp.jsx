import { useState } from 'react';
import { Form } from '../WeatherApp/components/Form';
import { Graphic } from '../WeatherApp/components/Graphic';
import { CardGallery } from '../WeatherApp/components/CardGallery';
import { Col, Container, Row } from 'react-bootstrap';

const WeatherApp = () => {
  const [forecast, setForecast] = useState([]);

  return (
    <div className="min-h-screen bg-slate-900 pt-10">
      <Container fluid className='py-5'>
        <h2 className="text-4xl font-black mb-10 text-white text-center tracking-tighter">
          WEATHER <span className="text-blue-400 uppercase font-bold italic">FORECAST</span>
        </h2>
        
        <Row className="justify-content-center">
          <Col md={10} lg={4} className="mb-6">
            <Form setForecast={setForecast} />
          </Col>

          <Col md={12} lg={8}>
            <CardGallery forecast={forecast} />
          </Col>
        </Row>

        <Row className="mt-10">
          <Col className="px-4">
            {forecast.length > 0 && (
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-2xl">
                <Graphic forecast={forecast} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WeatherApp;