import { useEffect, useState } from "react";
import { Button, Slider, Space } from "antd";
import { Col, Row } from "react-bootstrap";
import { InputNumber } from "antd";

export function Answer(  person  ) {
  const [currentInputValue, setCurrentInputValue] = useState([0, 100]);

  const [sliders, setSliders] = useState([
    { id: 1, enable: true, currentValue: currentInputValue },
  ]);

  const [currentSliderId, setCurrentSliderId] = useState(1);

  const onChange = (newValue) => {
    setCurrentInputValue(newValue);
    setSliders([
      ...sliders.map((slider) =>
        slider.id === currentSliderId
          ? { ...slider, currentValue: newValue }
          : slider
      ),
    ]);
  };

  const RenderedSliders = () =>
    sliders.map(({ id, enable, currentValue, result }) => (
      <Row data-testid={"slider-" + id}>
        <Col md={8}>
          <Slider
            range
            disabled={!enable}
            value={currentValue}
            onChange={onChange}
          />
        </Col>
        <Col md={3}>
          <Space>
            <h6>{currentValue[0]}</h6>
            <h6>-</h6>
            <h6>{currentValue[1]}</h6>
          </Space>
        </Col>
        <Col md={1}>{result}</Col>
      </Row>
    ));

  const handleNextMovement = () => {
    console.log("CV", currentInputValue)
    console.log("PERSON", person)

    const currentSlidersDisabled = [
      ...sliders.map((slider) =>
        slider.id === currentSliderId
          ? {
              ...slider,
              enable: false,
              currentValue: currentInputValue,
              result: currentInputValue[0] <= person.age && currentInputValue[1] >= person.age ? "🟡" : "🔴",
            }
          : slider
      ),
    ];

    if (currentSliderId >= 5) {
      setSliders(currentSlidersDisabled);
    } else {
      setSliders([
        ...currentSlidersDisabled,
        {
          id: currentSliderId + 1,
          enable: true,
          currentValue: [0, 100],
        },
      ]);

      setCurrentSliderId(currentSliderId + 1);
    }
  };

  return (
    <>
      <RenderedSliders />
      <Row>
        <Col>
          <InputNumber data-testid="guess-input" min={0} max={100} />
        </Col>
      </Row>

      <Row>
        <Button
          data-testid="buttonNext"
          type="primary"
          onClick={() => {
            handleNextMovement();
          }}
        >
          Next >>
        </Button>
      </Row>
    </>
  );
}
