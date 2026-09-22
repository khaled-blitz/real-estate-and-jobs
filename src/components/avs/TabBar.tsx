import { Button, Typography } from "antd";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const TabBar = () => {
  return (
    <div className="flex flex-col mt-0 md:mt-[40px] self-end w-full items-end">
      <Link href={`${window.location.origin}/o/login`}>
        <Button type="primary">Konto</Button>
      </Link>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <Logo />
        <div className="w-full flex justify-start md:justify-end">
          <div className="flex items-start md:items-end my-4 md:my-0 gap-4">
            <a href="https://find4west.ch/" target="_blank" rel="noreferrer">
              <Typography.Text className="ml-1">
                find4west
              </Typography.Text>
            </a>
            <a href="https://immo4west.ch/immo" target="_blank" rel="noreferrer">
              <Typography.Text className="ml-1">Immobilien</Typography.Text>
            </a>
            <a href="https://job4west.ch/" target="_blank" rel="noreferrer">
              <Typography.Text className="ml-1">jobs</Typography.Text>
            </a>
          </div>
        </div>

        {/* Desktop Menu */}
        {/* <div className="hidden lg:flex">
          <Button type="text">Start</Button>
          <Button type="text">Immobilien</Button>
          <Button type="text">Jobs</Button>
          <Button type="text">Fahrzeuge</Button>
          <Button type="text">Dienstleistungen</Button>
          <Button type="text">Kleinanzeigen</Button>
          <Button type="text">Events</Button>
        </div>

        {/* Mobile Menu Button */}
        {/* <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button> */}

        {/* Mobile Menu */}
        {/* {isMenuOpen && (
          <div className="absolute top-[120px] left-0 w-full bg-[#d6a975] shadow-lg flex flex-col items-center lg:hidden z-50 pb-8">
             <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Start
            </Button>
            <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Immobilien
            </Button>
            <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Button>
            <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Fahrzeuge
            </Button>
            <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Dienstleistungen
            </Button>
            <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Kleinanzeigen
            </Button>
            <Button
              type="text"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Button> 
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TabBar;
