/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useModal } from "../providers/ModalContext";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter: React.FC = () => {
  const { openModal } = useModal();
  return (
    <Footer
      style={{ background: "#2C2A33", color: "#fff", padding: "40px 20px" }}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-[1100px]">
        <Row gutter={[16, 16]} justify="space-between" className="w-full">
          {/* Contact Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#fff" }}>
              find4west.ch
            </Title>
            <Text style={{ display: "block", color: "#bbb" }}>
              Müller Medien AG
            </Text>
            <Text style={{ display: "block", color: "#bbb" }}>
              Kirchstrasse 6
            </Text>
            <Text style={{ display: "block", color: "#bbb" }}>
              3780 Gstaad
            </Text>
            <Text style={{ display: "block", color: "#bbb" }}>
              +41 33 748 88 74
            </Text>
            <Link href="mailto:info@find4west.ch" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                info@find4west.ch
              </Text>
            </Link>
            <Link href="mailto:info@mmedien.ch" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                info@mmedien.ch
              </Text>
            </Link>
            <Link href="https://www.mmedien.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                www.mmedien.ch
              </Text>
            </Link>
            <Link href="https://www.instagram.com/find4west/" target="_blank">
              <InstagramOutlined
                style={{ fontSize: "20px", color: "#bbb", marginTop: "10px" }}
              />
            </Link>
            <Link href="mailto:info@find4west.ch" target="_blank">
              <Text
                style={{ display: "block", color: "#bbb", marginTop: "10px" }}
              >
                Hilfe
              </Text>
            </Link>
          </Col>

          {/* Angebote */}
          <Col xs={24} sm={12} md={4}>
            <Title level={5} style={{ color: "#fff" }}>
              Angebote
            </Title>
            <Link href="mailto:info@find4west.ch" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Geschäftskunde werden
              </Text>
            </Link>

            <Link href="mailto:info@find4west.ch" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>Werbung</Text>
            </Link>

            <Link href="/">
              <Text style={{ display: "block", color: "#bbb" }}>
                Immobilien
              </Text>
            </Link>
            <button onClick={openModal}>
              <Text
                style={{ display: "block", color: "#bbb", paddingLeft: "15px" }}
              >
                Inserat erstellen
              </Text>
            </button>

            <Link href="https://job4west.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Jobs
              </Text>
            </Link>
            <Link href="https://job4west.ch/jobsv4/jobs/inserieren" target="_blank">
              <Text
                style={{ display: "block", color: "#bbb", paddingLeft: "15px" }}
              >
                Inserat erstellen
              </Text>
            </Link>
            
            <Link href="https://find4west.ch/home/firmen/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>Firmenverzeichnisse</Text>
            </Link>
            
            <Link href="https://find4west.ch/home/vereine/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>Vereinsverzeichnisse</Text>
            </Link>
            
            <Link href="https://find4west.ch/home/freiwilligenarbeit/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>Freiwilliges Engagement</Text>
            </Link>
            
            <Link href="https://find4west.ch/home/gemeinden/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>Gemeinden</Text>
            </Link>
            
            <Link href="https://find4west.ch/home/videos/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>Videos</Text>
            </Link>
          </Col>

          {/* Services */}
          <Col xs={24} sm={12} md={4}>
            <Title level={5} style={{ color: "#fff" }}>
              Services
            </Title>
            <Link
              href={`${window.location.origin}/o/login`}
              target="_blank"
            >
              <Text style={{ display: "block", color: "#bbb" }}>
                Login
              </Text>
            </Link>

            <Title level={5} style={{ color: "#fff", marginTop: "20px" }}>
              Portfolio
            </Title>
            <Link href="https://www.mmedien.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Müller Medien
              </Text>
            </Link>
            <Link href="https://www.mmarketing.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Müller Marketing
              </Text>
            </Link>
            <Link href="https://www.gstaadlife.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                GstaadLife
              </Text>
            </Link>
            <Link href="https://gstaad-my-love.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                GSTAAD MY LOVE
              </Text>
            </Link>
            <Link href="https://www.lehrebeo.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Lehre BeO
              </Text>
            </Link>
            <Link href="https://fokus-saanenland.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Im Fokus
              </Text>
            </Link>
            <Link href="https://www.anzeigervonsaanen.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                Anzeiger von Saanen
              </Text>
            </Link>
            <Link href="https://www.find4west.ch/" target="_blank">
              <Text style={{ display: "block", color: "#bbb" }}>
                find4west
              </Text>
            </Link>
          </Col>

          {/* Rechtliches */}
          <Col xs={24} sm={12} md={5}>
            <Title level={5} style={{ color: "#fff" }}>
              Rechtliches
            </Title>
            <Link
              href="https://anzeigervonsaanen-img.localpoint.ch/f/12/ce5dbe3ba5434e20d3529284df2294f1_43d800db4e7abf003ab8bbb55878cbf7.pdf"
              target="_blank"
            >
              <Text style={{ display: "block", color: "#bbb" }}>AGB</Text>
            </Link>
            <Link
              href="https://find4west.ch/datenschutz/"
              target="_blank"
            >
              <Text style={{ display: "block", color: "#bbb" }}>
                Datenschutzbestimmungen
              </Text>
            </Link>
            <Link
              href="https://anzeigervonsaanen-img.localpoint.ch/f/12/de872779ed9a4ca3a72ac0d51c10ea5a_a9f8f2e6dfee686050b50f57111b085e.pdf"
              target="_blank"
            >
              <Text style={{ display: "block", color: "#bbb" }}>Impressum</Text>
            </Link>
          </Col>
        </Row>

        {/* Bottom Logo & Copyright */}
        <Row
          justify="end"
          style={{ marginTop: "30px", textAlign: "center" }}
          className="flex w-full items-end "
        >
          <img
            src="immo/avs/icons/MM_RGB-mono.png"
            alt={"logo"}
            style={{
              maxWidth: "68px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
              paddingRight: "10px"
            }}
          />
          <Col>
            <Text style={{ color: "#bbb" }}>© 2026 find4west.ch</Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;
