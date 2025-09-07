import React, { useState, useEffect } from "react";
import { BsEnvelopeExclamation, BsClockHistory, BsArrowRight, BsPeople } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { WordRequestServices } from '../../api.js';
import { statsServices } from '../../api.js';

const Overview = () => {

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ todaysRequests: 0, uncheckedRequests: 0, overallUsers: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch recent requests and stats on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get 10 recent requests
        const resRequests = await WordRequestServices.getTodayWordRequests();
        setRequests(WordRequestServices.data);

        // Get stats
        const resStats = await statsServices.getStats();
        setStats(resStats.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold my-5 text-[#4A5568]">Welcome, Nita!</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#667EEA] rounded-lg shadow p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{stats.todaysRequests}</h2>
                <p className="text-white">Today's Requests</p>
              </div>
              <div className="text-white">
                <BsEnvelopeExclamation size={40} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray mb-4">{stats.uncheckedRequests}</h2>
                <p className="text-gray">Uncheck Requests</p>
              </div>
              <div className="text-[#667EEA]">
                <BsClockHistory size={40} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray mb-4">{stats.overallUsers}</h2>
                <p className="text-gray">Overall Users</p>
              </div>
              <div className="text-[#667EEA]">
                <BsPeople size={40} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Requests Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="pt-2 pb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Recent Request</h2>
            <NavLink 
            to="/admin/requests"
            className="flex items-center gap-2 ">
              <p className="text-red-600">See More</p>
              <div className="text-red-600">
                <BsArrowRight size={15} />
              </div>
            </NavLink>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-none rounded-lg shadow-sm overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-gray-700 font-semibold">ID</th>
                  <th className="px-4 py-4 text-left text-gray-700 font-semibold">Request By</th>
                  <th className="px-4 py-4 text-left text-gray-700 font-semibold">Word</th>
                  <th className="px-4 py-4 text-left text-gray-700 font-semibold">Definition</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request, index) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{request.id}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{request.requestedBy}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{request.word}</td>
                    <td className="px-4 py-4 border-b border-gray-200 text-gray-600">{request.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default Overview;