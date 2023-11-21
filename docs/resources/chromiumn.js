const chrom_scatter2d_new = {
	//debug: true,
	type: 'ScatterBio2',
	id: 'chrom_scatter2d',
	row: 1,
	col: 2,
	rowspan: 3,
	config: {
		merge: false,
		startup_msg: 'Please select Cell Type to load data',
		size: {
			width: 800,
			height: 600,
		},
		dotsize: {
			doctFactor: 300,
			min: 2,
			max: 8,
		},
		colourby: 'chrom_colour',
		exclusion: [],
		api: {
			metadata: {
				href: 'https://visualify.pharmacy.arizona.edu/api/esodev/ncelltypes/Chromium/', //http://localhost:3000/HsEso/ncelltypes/Chromium/
				val: 'vnode',
			},
			gene: {
				href: 'https://visualify.pharmacy.arizona.edu/api/esodev/gene/Chromium/',
				val: 'chrom_gene',
				dep: 'metadata',
			},
		},
		mapping: {
			api: {
				'ENS (S)': 'ens_iter_2',
				'IM (S)': 'im_iter_2',
				'MES (S)': 'mes_iter_2',
				'SKM (S)': 'skm_iter_2',
				'ENDO (S)': 'endo_iter_2',
				'EPI (E)': 'epi_iter_2',
				Stroma: 'stroma_iter_1',
				Epithelium: 'epi_iter_1',
			},
			axis: {
				x: '2D_UMAP_1',
				y: '2D_UMAP_2',
				extra: {
					Stage: 'Stage',
					UMI: 'n_UMIs',
					MT: 'percent_MT',
					Gene: 'n_Genes',
					Cell_Type: 'Cell_Type',
					Cell_ID: 'Cell_ID',
				},
			},
		},
	},
	// the above setting is the minimum setting for the scatter plot
	echart: {
		title: {
			textStyle: {
				fontSize: 20,
			},
			left: 'center',
			top: 0,
		},
		animation: false,
		legend: {
			textStyle: {
				fontSize: 18,
			},
			orient: 'horizontal',
			right: 'center', // "top" | "bottom" | "center"
			itemWidth: 20,
			width: 600,
			top: 20,
		},
		dataZoom: [
			// Inside type for X-axis
			{
				type: 'inside',
				xAxisIndex: 0,
				filterMode: 'filter',
			},
			// Inside type for Y-axis
			{
				type: 'inside',
				yAxisIndex: 0,
				filterMode: 'filter',
				orient: 'vertical',
			},
			/*
			// Slider type for X-axis
			{
				type: 'slider',
				xAxisIndex: 0,
				filterMode: 'filter',
			},

			// Slider type for Y-axis
			{
				type: 'slider',
				yAxisIndex: 0,
				filterMode: 'filter',
				orient: 'vertical',
			},*/
		],
		xAxis: {
			name: 'UMAP 1',
			type: 'value',
			nameLocation: 'middle',
			nameGap: 10,
			nameTextStyle: {
				fontSize: 18, // Set font size
				fontWeight: 'bold', // Set font weight to bold
			},
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: { show: false },
			axisLabel: { show: false },
			//min: -20,
			//max: 20,
		},
		yAxis: {
			name: 'UMAP 2',
			type: 'value',
			nameLocation: 'middle',
			nameGap: 10,
			nameTextStyle: {
				fontSize: 18, // Set font size
				fontWeight: 'bold', // Set font weight to bold
			},
			//min: -20,
			//max: 20,
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: { show: false },
			axisLabel: { show: false },
		},
		toolbox: {
			feature: {
				saveAsImage: {
					show: true,
				},
			},
		},
		grid: {
			top: '20%',
			bottom: '12%',
			left: '10%',
			right: '10%',
		},
		tooltip: {
			trigger: 'item',
			axisPointer: {
				type: 'cross',
			},
			formatter: (params) => {
				let express =
					Math.round(params.data.Expression * 10000) / 10000;
				return `
                    <div style="text-align: center;">
                        ${params.data.Cell_ID} 
                        <br/> Type: <strong>${params.data.Cell_Type} </strong>
                        <br/> Stage: <strong>${params.data.Stage}</strong>
                        <br/> #UMI: <strong>${params.data.UMI}</strong>
                        <br/> #Gene: <strong>${params.data.Gene}</strong>
                        <br/> MT%: <strong>${params.data.MT}</strong>
                        ${
							express != null
								? '<br/> Expression: <strong>' +
								  express +
								  '</strong>'
								: ''
						}
                    </div>
                `;
			},
		},
	},
};

// -------------------------------------------------------------------------------------
const chromiumn = {
	layout: {
		type: 'grid', // grid
		rows: 3,
		cols: 3,
		gap: '1px',
		//debug: true,
		style: {
			//margin: "0px -5% 0px -5%",
			font: 'Arial, sans-serif',
		},
	},
	components: [
		chrom_celllayer,
		chrom_colour,
		chrom_searchbar,
		chrom_scatter2d_new,
		chrom_scatter2d,
	],
};
