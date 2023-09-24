import { Component } from "react";
import "./App.css";

// interface DataT {
//   name:string;
//   age:{
//     kls:string;
//   }[]
// }

// const data:DataT[] = [
//   { name: "jean", age: [{ kls: "2" }, { kls: "3" }] },
//   { name: "hasael", age: [{ kls: "4" }, { kls: "5" }] },

// ];

interface ProvinceData {
	id: string;
	name: string;
}
interface RegenciesData extends ProvinceData {
	province_id: string;
}
interface DistrictsData extends ProvinceData {
	regency_id: string;
}
interface VillagesData extends ProvinceData {
	district_id: string;
}

interface CountryTerritory {
	province?: ProvinceData[];
	regencies?: RegenciesData[];
	districts?: DistrictsData[];
	villages?: VillagesData[];
}
interface ValueFormSection {
	// idProvince?: string;
	getAllValue: [];
	provinceValue: string;
	regenciesValue: string;
	districtsValue: string;
	villagesValue: string;
	selectedProvinceId: string;
	selectedRegenciesId: string;
	selectedDistrictsId: string;
}

class App extends Component<{}, CountryTerritory & ValueFormSection> {
	constructor(props: {}) {
		super(props);
		this.state = {
			province: [] || null,
			districts: [] || null,
			regencies: [] || null,
			villages: [] || null,
			provinceValue: "",
			districtsValue: "",
			regenciesValue: "",
			villagesValue: "",
			selectedProvinceId: "",
			selectedRegenciesId: "",
			selectedDistrictsId: "",
			getAllValue: [],
		};
	}

	componentDidMount() {
		this.fetchApiProvince();
		this.fetchApiRegencies();
		this.fetchApidistricts();
		this.fetchApiVillages();
	}
	componentDidUpdate(prevState: any) {
		if (prevState.selectedProvinceId !== this.state.selectedProvinceId) {
			this.fetchApiRegencies();
		}
		if (prevState.selectedRegenciesId !== this.state.selectedRegenciesId) {
			this.fetchApidistricts();
		}
		if (prevState.selectedDistrictsId !== this.state.selectedDistrictsId) {
			this.fetchApiVillages();
		}
	}

	// mengambil data wilayah indonesia
	// 1.provinsi
	fetchApiProvince() {
		fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
			.then((response) => {
				const data = response.json();
				return data;
			})
			.then((data) => {
				this.setState({ province: data });
			});
	}
	// 2.kabupate/kota
	fetchApiRegencies() {
		const id: string = this.state.selectedProvinceId;
		if (id !== "") {
			fetch(
				`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`
			)
				.then((response) => {
					const data = response.json();
					return data;
				})
				.then((data) => {
					this.setState({ regencies: data });
				});
		}
	}
	// 3.kecamatan
	fetchApidistricts() {
		const id: string = this.state.selectedRegenciesId;
		if (id !== "") {
			fetch(
				`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
			)
				.then((response) => {
					const data = response.json();
					return data;
				})
				.then((data) => {
					this.setState({ districts: data });
				});
		}
	}
	// 4.kelurahan
	fetchApiVillages() {
		const id: string = this.state.selectedDistrictsId;
		if (id !== "") {
			fetch(
				`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
			)
				.then((response) => {
					const data = response.json();
					return data;
				})
				.then((data) => {
					this.setState({ villages: data });
				});
		}
	}

	render() {
		const {
			province,
			districts,
			regencies,
			villages,
			provinceValue,
			districtsValue,
			regenciesValue,
			villagesValue,
		} = this.state;

		// console.log(selectedProvinceId);

		console.log(villages);
		// console.log(this.state.selectedDistrictsId);

		// console.log(provinceValue);

		return (
			<>
				<div className="container-form">
					<h1>Pleace Entered your Address</h1>
					<form action="" className="form-select">
						<label htmlFor="province">Province</label>
						<select
							name="province"
							id="province"
							defaultValue={"--province--"}
							onChange={(e) => {
								const selectedProvinceName = e.target.value;
								const selectedProvince = province?.find(
									(data) => data.name === selectedProvinceName
								);
								if (selectedProvince) {
									this.setState({
										provinceValue: selectedProvinceName,
										selectedProvinceId: selectedProvince.id,
									});
								}
							}}>
							<option value="--province--">Select your Province</option>
							{province?.map((data, index) => (
								<option value={data.name} key={index}>
									{data.name}
								</option>
							))}
						</select>
						<label htmlFor="regencies">Regencies</label>
						<select
							name="regencies"
							id="regencies"
							defaultValue={"--regencies--"}
							onChange={(e) => {
								const selectedRegencieName = e.target.value;
								const selectedRegencie = regencies?.find(
									(data) => data.name === selectedRegencieName
								);
								if (selectedRegencie) {
									this.setState({
										regenciesValue: selectedRegencieName,
										selectedRegenciesId: selectedRegencie.id,
									});
								}
							}}>
							<option value="--regencies--" disabled>
								Select your regencies
							</option>
							{regencies?.map((data, index) => (
								<option value={data.name} key={index}>
									{data.name}
								</option>
							))}
						</select>
						<label htmlFor="districts">Districts</label>
						<select
							name="districts"
							id="districts"
							defaultValue={"--districts--"}
							onChange={(e) => {
								const selectedDistrictName = e.target.value;
								const selectedDistrict = districts?.find(
									(data) => data.name === selectedDistrictName
								);
								if (selectedDistrict) {
									this.setState({
										districtsValue: selectedDistrictName,
										selectedDistrictsId: selectedDistrict.id,
									});
								}
							}}>
							<option value="--districts--" disabled>
								Select your districts
							</option>
							{districts?.map((data, index) => (
								<option value={data.name} key={index}>
									{data.name}
								</option>
							))}
						</select>
						<label htmlFor="villages">Villages</label>
						<select
							name="villages"
							id="villages"
							defaultValue={"--villages--"}
							onChange={(e) =>
								this.setState({ villagesValue: e.target.value })
							}>
							<option value="--villages--" disabled>
								Select your villages
							</option>
							{villages?.map((data, index) => (
								<option value={data.name} key={index}>
									{data.name}
								</option>
							))}
						</select>
					</form>
				</div>
				<div className="value-input">
					<h1>Data yang telah anda input</h1>
					<div>
						<label htmlFor="province">Province</label>
						<input
							id="province"
							type="text"
							value={provinceValue !== "" ? provinceValue : ""}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="regencies">Regencies</label>
						<input
							id="regencies"
							type="text"
							value={regenciesValue !== "" ? regenciesValue : ""}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="districts">Districts</label>
						<input
							id="districts"
							type="text"
							value={districtsValue !== "" ? districtsValue : ""}
							disabled
						/>
					</div>
					<div>
						<label htmlFor="villages">Villages</label>
						<input
							id="villages"
							type="text"
							value={villagesValue !== "" ? villagesValue : ""}
							disabled
						/>
					</div>
				</div>
			</>
		);
	}
}

export default App;
