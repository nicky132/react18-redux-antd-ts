/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-14 14:44:52
 * @LastEditTime: 2022-08-15 13:49:51
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\pages\dashboard\index.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Index() {
	const chartRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chartRef.current) {
			const option = {
				title: {
					text: "Referer of a Website",
					subtext: "Fake Data",
					left: "center",
				},
				tooltip: {
					trigger: "item",
				},
				legend: {
					orient: "vertical",
					left: "left",
				},
				series: [
					{
						name: "Access From",
						type: "pie",
						radius: "50%",
						data: [
							{ value: 1048, name: "Search Engine" },
							{ value: 735, name: "Direct" },
							{ value: 580, name: "Email" },
							{ value: 484, name: "Union Ads" },
							{ value: 300, name: "Video Ads" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			};

			const myChart = echarts.init(
				chartRef.current as unknown as HTMLDListElement
			);
			myChart.setOption(option);
			window.addEventListener("resize", () => {
				myChart.resize();
			});
		}
	}, []);
	return (
		<div style={{ width: "500px", height: "500px" }} ref={chartRef}></div>
	);
}

export default Index;
