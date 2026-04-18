import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { uploadExcelFile } from "../reducer/slice/excelSlice"; 
import DashboardLayout from "../Layouts/DashboardLayout"; 

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.excel);

  // 📥 Handle file select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // 🔥 Preview logic
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setPreviewData(jsonData.slice(0, 5)); // 👈 only first 5 rows preview
    };
  };

  // 🚀 Upload
  const handleUpload = () => {
    if (!file) return;
    dispatch(uploadExcelFile(file));
  };

  return (
    <DashboardLayout>
      <div className="bg-white border border-border rounded-2xl p-6">

        {/* Heading */}
        <h2 className="text-xl font-semibold text-text mb-6">
          Upload Contacts (Excel)
        </h2>

        {/* File Input */}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Preview */}
        {previewData.length > 0 && (
          <div className="overflow-x-auto mb-6">
            <h3 className="text-sm font-medium text-text mb-2">
              Preview (First 5 rows)
            </h3>

            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-surface">
                  {Object.keys(previewData[0]).map((key) => (
                    <th key={key} className="px-3 py-2 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="border-t">
                    {Object.values(row).map((val, idx) => (
                      <td key={idx} className="px-3 py-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

        {/* Status */}
        {success && <p className="text-green-600 mt-4">Upload successful ✅</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

      </div>
    </DashboardLayout>
  );
};

export default Upload;