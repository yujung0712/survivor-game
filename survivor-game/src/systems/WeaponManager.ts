export type WeaponType =
  | "FIRE"
  | "ICE"
  | "LIGHTNING";

export class WeaponManager {
  private weapons: WeaponType[] = [];

  // 무기 추가
  public addWeapon(weapon: WeaponType) {
    if (this.weapons.includes(weapon)) {
      console.log(`${weapon} 이미 보유중`);
      return;
    }

    this.weapons.push(weapon);

    console.log("현재 무기 :", this.weapons);
  }

  // 가지고 있는지 확인
  public hasWeapon(weapon: WeaponType) {
    return this.weapons.includes(weapon);
  }

  // 모든 무기 가져오기
  public getWeapons() {
    return this.weapons;
  }
}