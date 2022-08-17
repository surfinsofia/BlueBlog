module.exports = {
    // formats the date to be more user friendly
    formatDate: date => {
        return `${new Date(date).getFullYear()}/${new Date(date).getMonth() + 1}/${new Date(date).getDate()}`;
    }
}

