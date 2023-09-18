// Core viewer
import { Viewer } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";

import { ReactElement } from "react";
import { ToolbarProps } from "@react-pdf-viewer/default-layout";
import { ToolbarSlot } from "@react-pdf-viewer/toolbar";

function PdfFile() {
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <div style={{ padding: "0px 2px" }}>
              <ZoomOut />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Zoom />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <ZoomIn />
            </div>

            <div
              style={{
                padding: "0px 2px",
                marginLeft: "auto",
              }}
            >
              <GoToPreviousPage />
            </div>
            <div
              style={{
                padding: "0px 2px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CurrentPageInput /> / <NumberOfPages />
            </div>
            <div style={{ padding: "0px 2px", marginRight: "auto" }}>
              <GoToNextPage />
            </div>

            <div style={{ padding: "0px 3px", marginLeft: "auto" }}>
              <Download />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({ renderToolbar });

  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {/* <!--  The viewer component will be put here --> */}
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "calc(100vh - 4rem)",
          }}
        >
          <Viewer
            fileUrl=" /ts.pdf"
            // fileUrl="https://typora728.oss-cn-beijing.aliyuncs.com/pdf/ts.pdf"
            plugins={[
              // Register plugins
              defaultLayoutPluginInstance,
            ]}
            withCredentials={true}
          />
        </div>
      </Worker>
    </div>
  );
}

export default PdfFile;
