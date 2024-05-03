import axios from "axios";

const province = axios.create({
    baseURL: "https://vapi.vnappmob.com/",
});

export const resProvince = async () => {
    try {
        const res = await province.get('api/province');
        return res;
    } catch (error) {
        console.log("loi: ", error);
    }
}

export const resDistrict = async (provinceId) => {
    try {
        const res = await province.get(`api/province/district/${provinceId}`);
        return res;
    } catch (error) {
        console.log("loi: ", error);
    }
}

export const resWard = async (districtId) => {
    try {
        const res = await province.get(`api/province/ward/${districtId}`);
        return res;
    } catch (error) {
        console.log("loi: ", error);
    }
}